# MAC
conn = pyodbc.connect(
       'DRIVER=/opt/homebrew/lib/libmsodbcsql.17.dylib' + 
       ';SERVER=' + 'localhost,1433' + ';UID=' + 'sa' + 
       ';PWD=' + 'dockerStrongPwd123' +
       ';database=ESPNCricInfo')
