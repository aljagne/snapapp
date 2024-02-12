export default function messageToHTML(message: string) {
  const startString = "<!DOCTYPE html>";
  const endString = "</html>";
  const start = message.indexOf(startString);
  const end = message.indexOf(endString);

  //Use slice to extract the HTML document, ensure that </html> is included in the extracted content.
  const html = message.slice(start, end + endString.length);
  return html;
}
