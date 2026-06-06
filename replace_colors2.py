import os
import re

directory = 'admin-web/src'

# Notice no \b at the end. We just optionally match opacity.
color_pattern = re.compile(r'(bg|text|border|fill)-\[#(?:1FC451|229c22|15803d|1fc451|16a34a|166534)\](/[0-9]+)?')

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith(('.tsx', '.ts')):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            orig_content = content
            
            # Replace tailwind arbitrary colors with brand-green
            content = color_pattern.sub(r'\1-brand-green\2', content)
            
            if content != orig_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'Updated {filepath}')
