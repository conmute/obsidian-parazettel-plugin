# P.A.R.A and Zettelkasten for Obsidian

...but opinionated 🤗

So zetelkasten is for personal note taking, think of a having a good though and having a way to capture it.

But when studying or working P.A.R.A. fits even better! So if I learn new subject, I usually consume thoughts and nice to note them for further reuse in the "Resource" folder.

## TODO for Concept level

* [v] Create note with name `YYYYMMDD-<%=snakecaseEscape(title) %>.md` in configured INBOX folder
* [v] Create a folder note with name `YYYYMMDD-<%=snakecaseEscape(title) %>/YYYYMMDD-<%=snakecaseEscape(title) %>.md` for fodlered notes
* [ ] Process INBOX folder: skip/approve/delete to ZETTELKASTEN folder
* [ ] Create a hubbed note under HUBS folder
* [ ] If note has HUB: On INBOX `approve` move from INBOX to NOTES folder under `NOTES/<hubname>/` folder

## Ideas

For P.A.R.A., few of things to include is P.A.R.A. actions.
Some actions like like create entity, archive it or...
rotate (create dated subfolder, where we can continue writing!)

* Add Zettelkasten template examples...
* Project, from P.A.R.A., add project structure template example...
* Area, from P.A.R.A., add area template structure example...
* Resources, from P.A.R.A., add resource template structure example...
* Archive, from P.A.R.A, add Archive logic to handle moving any possible note into corresponding folder and time range delimiter

For Project/Area/Resources when editing have a hashmap differences calculate changed files. Then at main project/area/resource file have a command to write an update to made changes, therefore keep track of changes that has been made. Or so called log! It wont be gitlike, but at least history of changes. It can be helpfull when adding / updating notes on a subject as long as we are going to work about it.

For Project, setup its in a way that it can have todos there, and have a genereted action lists which can be processed accordingly. Therefore we might have an todo inbox, just a collection where we just keep it in todo list or move them to the project. And have a single view on them. Hard dependency on dataview here
