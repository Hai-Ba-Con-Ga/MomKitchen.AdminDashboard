import csv
import json

# Input CSV file and output directory
input_csv_file = 'translations.csv'  # Replace with your CSV file path
output_dir = './utils/lang/locale'  # Directory where JSON files will be saved

# Create the output directory if it doesn't exist
import os
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Languages to extract
languages = ['en', 'vi', 'ko']

for language in languages:
    json_data = {}

    with open(input_csv_file, newline='') as csvfile:
        csv_reader = csv.DictReader(csvfile)
        for row in csv_reader:
            key = row['key']
            value = row[language]
            json_data[key] = value

    output_json_file = f'{output_dir}/{language}.json'
    with open(output_json_file, 'w', encoding='utf-8') as jsonfile:
        json.dump(json_data, jsonfile, ensure_ascii=False, indent=2)
    print(f'File "{output_json_file}" created.')