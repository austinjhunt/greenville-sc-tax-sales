# parse the tax sales at http://www.greenvillecounty.org/appsas400/taxsale/ and make them sortable
import requests
import json
from bs4 import BeautifulSoup


class GreenvilleTaxSalesParser:
    def __init__(self):
        self.tax_sales_url = 'http://www.greenvillecounty.org/appsas400/taxsale/'

    def clean_table_cell(self, cell):
        return cell.get_text().strip().replace('"', '')

    def get_table_cell_nested_a_href(self, cell):
        href = cell.find_all('a')[0].get('href')
        if href.startswith('//'):
            href = f'https:{href}'
        return href

    def convert_dollar_amount_to_float(self, dollar_amount):
        return float(dollar_amount.strip().replace('$', ''))

    def get_tax_sales_list(self):
        html_text = requests.get(self.tax_sales_url).text
        soup = BeautifulSoup(html_text, 'html.parser')
        tax_sale_list = []
        for table_row in soup.find_all('tr'):
            # each table row is formatted as item #, map #, name, amount due
            try:
                cells = table_row.find_all('td')
                tax_sale = {
                    'itemNumber':  self.clean_table_cell(cells[0]),
                    'mapNumberLink': self.get_table_cell_nested_a_href(cells[1]),
                    'mapNumber': self.clean_table_cell(cells[1]),
                    'name': self.clean_table_cell(cells[2]),
                    'amountDue': self.convert_dollar_amount_to_float(self.clean_table_cell(cells[3]))
                }
                tax_sale_list.append(tax_sale)
            except:
                pass
        return tax_sale_list

    def sort_tax_sales_by_amount_due(self, tax_sales):
        return sorted(tax_sales, key=lambda tax_sale: (tax_sale['amountDue']))
