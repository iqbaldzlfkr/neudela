import re

file_path = '/Users/bale/.gemini/antigravity-ide/brain/f8f80eb3-3184-4e95-b00e-31e669414cce/.system_generated/steps/210/content.md'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Let's search for "Next" or "Previous" class names or text in the main body (later in the file).
# Let's list all matches that occur after position 700000.
matches = re.finditer(r'(Next|Previous|Prev|PrevNext|NextPrev)', content)

for match in matches:
    pos = match.start()
    if pos > 700000:
        term = match.group()
        start = max(0, pos - 150)
        end = min(len(content), pos + 250)
        print(f"Match '{term}' at {pos}:\n{content[start:end]}\n")
