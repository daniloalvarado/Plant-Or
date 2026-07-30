"""
Enhanced DOCX to Markdown converter.
Extracts paragraphs with heading styles, tables, and lists from a .docx file.
"""
import zipfile
import xml.etree.ElementTree as ET
import sys
import os
import re

NS = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing',
}

def get_paragraph_text(para):
    """Extract all text from a paragraph element, including runs."""
    texts = []
    for run in para.findall('.//w:r', NS):
        for t in run.findall('w:t', NS):
            if t.text:
                texts.append(t.text)
    return ''.join(texts)

def get_paragraph_style(para):
    """Get the style name of a paragraph (e.g. Heading1, Heading2)."""
    pPr = para.find('w:pPr', NS)
    if pPr is not None:
        pStyle = pPr.find('w:pStyle', NS)
        if pStyle is not None:
            return pStyle.get(f'{{{NS["w"]}}}val', '')
    return ''

def is_list_paragraph(para):
    """Check if paragraph is a list item."""
    pPr = para.find('w:pPr', NS)
    if pPr is not None:
        numPr = pPr.find('w:numPr', NS)
        if numPr is not None:
            return True
    return False

def get_indent_level(para):
    """Get indentation level for list items."""
    pPr = para.find('w:pPr', NS)
    if pPr is not None:
        numPr = pPr.find('w:numPr', NS)
        if numPr is not None:
            ilvl = numPr.find('w:ilvl', NS)
            if ilvl is not None:
                return int(ilvl.get(f'{{{NS["w"]}}}val', '0'))
    return 0

def process_table(table):
    """Convert a table element to HTML table format."""
    rows = table.findall('w:tr', NS)
    if not rows:
        return ''
    
    html_lines = ['<table>']
    
    for row_idx, row in enumerate(rows):
        html_lines.append('  <tr>')
        cells = row.findall('w:tc', NS)
        for cell in cells:
            tcPr = cell.find('w:tcPr', NS)
            colspan = ''
            
            # Check for colspan
            if tcPr is not None:
                gridSpan = tcPr.find('w:gridSpan', NS)
                if gridSpan is not None:
                    span_val = gridSpan.get(f'{{{NS["w"]}}}val')
                    if span_val:
                        colspan = f' colspan="{span_val}"'
            
            paras = cell.findall('w:p', NS)
            cell_text = '<br>'.join([get_paragraph_text(p).strip() for p in paras if get_paragraph_text(p).strip()])
            
            # Escape basic HTML chars except our <br>
            cell_text = cell_text.replace('&', '&amp;').replace('<br>', '[[BR]]').replace('<', '&lt;').replace('>', '&gt;').replace('[[BR]]', '<br>')
            
            tag = 'th' if row_idx == 0 else 'td'
            html_lines.append(f'    <{tag}{colspan}>{cell_text}</{tag}>')
            
        html_lines.append('  </tr>')
        
    html_lines.append('</table>')
    return '\n'.join(html_lines)

def convert_docx_to_md(docx_path):
    """Main conversion function."""
    z = zipfile.ZipFile(docx_path)
    doc_xml = z.read('word/document.xml')
    root = ET.fromstring(doc_xml)
    
    body = root.find('w:body', NS)
    if body is None:
        return "Error: No body found in document"
    
    md_lines = []
    
    for element in body:
        tag = element.tag.split('}')[-1] if '}' in element.tag else element.tag
        
        if tag == 'p':  # Paragraph
            text = get_paragraph_text(element).strip()
            style = get_paragraph_style(element)
            
            # Check for images
            has_image = False
            if element.find('.//w:drawing', NS) is not None or element.find('.//w:pict', NS) is not None:
                has_image = True
                
            if not text and not has_image:
                # Empty paragraph - add spacing
                md_lines.append('')
                continue
                
            if has_image:
                image_marker = '\n> 🖼️ **[IMAGEN REFERENCIAL AQUÍ]**\n'
                text = (text + image_marker).strip() if text else image_marker.strip()
            
            # Map heading styles
            style_lower = style.lower()
            if 'heading1' in style_lower or style == 'Ttulo1' or style == 'Titulo1':
                md_lines.append(f'\n# {text}')
            elif 'heading2' in style_lower or style == 'Ttulo2' or style == 'Titulo2':
                md_lines.append(f'\n## {text}')
            elif 'heading3' in style_lower or style == 'Ttulo3' or style == 'Titulo3':
                md_lines.append(f'\n### {text}')
            elif 'heading4' in style_lower or style == 'Ttulo4' or style == 'Titulo4':
                md_lines.append(f'\n#### {text}')
            elif 'title' in style_lower or style == 'Ttulo' or style == 'Title':
                md_lines.append(f'\n# {text}')
            elif 'subtitle' in style_lower or style == 'Subttulo' or style == 'Subtitle':
                md_lines.append(f'\n## {text}')
            elif is_list_paragraph(element):
                indent = '  ' * get_indent_level(element)
                md_lines.append(f'{indent}- {text}')
            elif style == 'Prrafodelista' or style == 'ListParagraph' or 'listparagraph' in style_lower:
                indent = '  ' * get_indent_level(element)
                md_lines.append(f'{indent}- {text}')
            else:
                md_lines.append(text)
        
        elif tag == 'tbl':  # Table
            table_md = process_table(element)
            if table_md:
                md_lines.append('')
                md_lines.append(table_md)
                md_lines.append('')
        
        elif tag == 'sdt':
            # Structured document tags - extract paragraphs within
            for p in element.findall('.//w:p', NS):
                text = get_paragraph_text(p).strip()
                if text:
                    md_lines.append(text)
    
    return '\n'.join(md_lines)

if __name__ == '__main__':
    if len(sys.argv) > 1:
        docx_path = sys.argv[1]
    else:
        docx_path = os.path.join('Documentación', 'TRABAJO DE TALLER 2.docx')
    
    output_path = os.path.splitext(docx_path)[0] + '_v2.md'
    
    print(f"Converting: {docx_path}")
    result = convert_docx_to_md(docx_path)
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(result)
    
    print(f"Saved to: {output_path}")
    print(f"Total characters: {len(result)}")
