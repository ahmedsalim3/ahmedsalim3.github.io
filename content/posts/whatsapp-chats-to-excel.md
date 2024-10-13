---
date: 2024-07-23 12:00:00 +0800
title: Convert WhatsApp Chat Logs to Excel Sheets
categories:
  - Data Science
pin: false
render_with_liquid: false
tags:
   - Python
   - Excel
includes_code: yes
includes_math: no
---

{{< notice note "Note" >}}
The scripts are also hosted publicly in this [gist](https://gist.github.com/ahmedsalim3/27353fcd2f3360a83989fd6ee74e5d2f)
{{< /notice >}}

Exporting WhatsApp chat logs is a straightforward process that can be done directly from the app on your phone. You can choose to export chats with or without media attachments. In this blog, I will show you how to convert these `.txt` files into Excel sheets using Python.

Over the years, WhatsApp has changed the formatting of exported chat logs, particularly the timestamps. This notebook uses the latest format for WhatsApp chats, exported from iOS devices. The chat text files are formatted as follows:


`[MM/DD/YYYY, HH:MM:SS AM/PM] Name: Message`

We employ the Regular Expressions (Regex) library to identify the timestamps, names, and messages within the chat data. Additionally, the csv library is used to read, write, and process each line.

### How It Works?

- **Read the Chat File**: The script reads the chat file line by line.
- **Extract Details**: It uses regular expressions to pull out the timestamps, names, and messages.

Understanding these weird regex syntax can be quite a task. For that, we made use of the popular [regex101][regex101] website to extract the dates and names.

{{< figure src="/posts/whatsapp-chats-to-excel/regex_date.png" alt="Extract Date" caption="Extract Date" width="100%" class="right" >}}

{{< figure src="/posts/whatsapp-chats-to-excel/regex_name.png" alt="Extract Name" caption="Extract Name" width="100%" class="right" >}}

- **Organize Data**: Dates and times are split and organized into separate columns.
- **Save to CSV**: Finally, the script writes everything into a CSV file with columns for date, time, name, and message.

### The Script

```python
import re
import csv

date_re = r'\[(.*?)\]'
name_re = r'\] (.*?):'

path = 'example.txt'

with open(path, encoding='utf-8') as file:
    lines = file.readlines()

timestamps = []
names = []
messages = []

current_timestamp = ''
current_name = ''
current_message_lines = []

for line in lines:
    line = line.strip().encode('utf-8', 'ignore').decode('utf-8')
    time_match = re.match(date_re, line)
    if time_match:
        if current_message_lines:
            timestamps.append(current_timestamp)
            names.append(current_name)
            messages.append('\n'.join(current_message_lines).strip())
        current_timestamp = time_match.group(1).strip()
        name_match = re.search(name_re, line)
        if name_match:
            current_name = name_match.group(1).strip()
            current_message_lines = [line.split(name_match.group(0), 1)[1].strip()]
        else:
            current_name = ''
            current_message_lines = []
    else:
        current_message_lines.append(line.strip())

if current_message_lines:
    timestamps.append(current_timestamp)
    names.append(current_name)
    messages.append('\n'.join(current_message_lines).strip())

dates = []
times = []
for timestamp in timestamps:
    date, time = timestamp.split(',', 1)
    dates.append(date.strip())
    times.append(time.strip())

header = ['Date', 'Time', 'name', 'message']
rows = zip(dates, times, names, messages)

with open('chat.csv', 'w', newline='', encoding='utf-8-sig') as file:
    writer = csv.writer(file)
    writer.writerow(header)
    writer.writerows(rows)
```

Just save your WhatsApp chat to a text file named `example.txt`, place it in the same directory as this script, and run the script. You'll get a chat.csv file with all your chat data neatly organized.

### Creating a Fancy Excel Sheet

If you want to go a step further and create a fancy Excel sheet, you can use the following function:

```python
import re
from openpyxl import Workbook
from openpyxl.styles import Font
import pandas as pd

def chat_to_excel(path, output_file = 'chat.xlsx'):
    date_re = r'\[(.*?)\]'
    name_re = r'\] (.*?):'
    with open(path, encoding='utf-8') as file:
        lines = file.readlines()

    timestamps = []
    names = []
    messages = []

    current_timestamp = ''
    current_name = ''
    current_message_lines = []

    for line in lines:
        line = line.strip().encode('utf-8', 'ignore').decode('utf-8')
        time_match = re.match(date_re, line)
        if time_match:
            if current_message_lines:
                timestamps.append(current_timestamp)
                names.append(current_name)
                messages.append('\n'.join(current_message_lines).strip())
            
            current_timestamp = time_match.group(1).strip()
            name_match = re.search(name_re, line)
            if name_match:
                current_name = name_match.group(1).strip()
                current_message_lines = [line.split(name_match.group(0), 1)[1].strip()]
            else:
                current_name = ''
                current_message_lines = []
        else:
            current_message_lines.append(line.strip())

    if current_message_lines:
        timestamps.append(current_timestamp)
        names.append(current_name)
        messages.append('\n'.join(current_message_lines).strip())

    dates = []
    times = []

    for timestamp in timestamps:
        date, time = timestamp.split(',', 1)
        dates.append(date.strip())
        times.append(time.strip())

    df = pd.DataFrame({
        'Date': dates,
        'Time': times,
        'Name': names,
        'Message': messages
    })
    
    wb = Workbook()
    ws = wb.active
    ws.title = 'Chat Data'

    for col_num, column_title in enumerate(df.columns, 1):
        cell = ws.cell(row=1, column=col_num, value=column_title)
        cell.font = Font(bold=True)

    # Write the data
    for row_num, row_data in enumerate(df.values, 2):
        for col_num, cell_value in enumerate(row_data, 1):
            ws.cell(row=row_num, column=col_num, value=cell_value)

    # Adjust column widths
    for col in ws.columns:
        max_length = 0
        column = col[0].column_letter
        for cell in col:
            try:
                if len(str(cell.value)) > max_length:
                    max_length = len(cell.value)
            except:
                pass
        adjusted_width = max_length + 2
        ws.column_dimensions[column].width = adjusted_width

    wb.save(output_file)
```

And that's it! With these simple scripts, you can transform your WhatsApp chats into an orderly CSV or Excel file. Happy coding!

{{< notice note "Note" >}}
The scripts are also hosted publicly in this [gist](https://gist.github.com/ahmedsalim3/27353fcd2f3360a83989fd6ee74e5d2f)
{{< /notice >}}

[regex101]: https://regex101.com/