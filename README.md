# Email-editor

## How to use

`const emailEditor = new EmailsEditor(parameters)`

Parameters is object with next properties:
- container - Parent container for email editor (DOM Node).
- name - Board name (string).
- inputPlaceholder - placeholder for input container (string).
- showButtonsPanel - Show buttons panel with additional buttons for test purpose (boolean).

## EmailsEditor interface
    setEmails(emailList)
Get emailList as array of strings.

    getEmailList()
Returns Array of valid emails (string).

## Event for parent container
"changeList" event return `event.detail` as Array of valid emails(string).

