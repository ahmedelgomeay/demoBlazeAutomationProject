import * as fs from 'fs';

export class LoginCredentialsModifier {
   private static filePath: string = 'utils/test-data/loginCredentials/LoginCredentials.json';


public static addValuesToLines(lineNumbers: number[], values: string[]) {
     fs.readFile(this.filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return;
      }
  
      const lines = data.split('\n');
  
      lineNumbers.forEach((lineNumber, index) => {
        if (lineNumber >= 0 && lineNumber < lines.length) {
          lines[lineNumber] = values[index];
        } else {
          console.error(`Invalid line number: ${lineNumber}`);
        }
      });
  
      const updatedContent = lines.join('\n');
  
       fs.writeFile(this.filePath, updatedContent, 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('Login Credentials JSON updated successfully');
        }
      });
    });
  }

static b64EncodeUnicode(password: string): string {
  return btoa(
    encodeURIComponent(password).replace(/%([0-9A-F]{2})/g, (match, p1) => {
      return String.fromCharCode(parseInt(p1, 16));
    })
  );
}
}
