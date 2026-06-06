import os
import re

directory = 'admin-web/src'

dark_pattern = re.compile(r'\bdark:(?:bg|text|border|fill)-\[#(?:1FC451|229c22|15803d|1fc451|16a34a|166534)\](?:/[0-9]+)?\s*')
color_pattern = re.compile(r'(bg|text|border|fill)-\[#(?:1FC451|229c22|15803d|1fc451|16a34a|166534)\](/[0-9]+)?\b')
hex_pattern = re.compile(r'(?<!\[)#(?:1FC451|229c22|15803d|1fc451|16a34a|166534)\b')

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            orig_content = content
            
            # 1. Remove dark variants
            content = dark_pattern.sub('', content)
            
            # 2. Replace tailwind arbitrary colors with brand-green
            content = color_pattern.sub(r'\1-brand-green\2', content)
            
            # 3. For any remaining raw hex strings (e.g. inline styles or css files), replace with var(--brand-green)
            # wait, we must be careful not to replace in hex_pattern if it's not needed, but we do want it in .css files!
            if file.endswith('.css'):
                content = hex_pattern.sub('var(--brand-green)', content)
            
            if content != orig_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'Updated {filepath}')
