# Email-editor

`email-editor.js` - embed for script
`email-editor.css` - embed for styling

## How to use

`const emailEditor = new EmailsEditor(parameters)`

Parameters is object with next properties:

-   container - Parent container for email editor (DOM Node).
-   inputPlaceholder - placeholder for input container (string).

## EmailsEditor interface

`setEmails(emailList)` - Sets email list to email editor. Takes `emailList` as Array of strings.

`addEmail(email)` - Add email to existing email list. Takes `email` as strings.

`getEmailList()` - returns Array of valid emails (string).

## Event for parent container

"changeList" Event return `event.detail` as Array of valid emails(string).
