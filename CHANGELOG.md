## Version 1.0.5

New: Warn when trying to compile remote files (i.e. on SFTP-Servers) which currently seems impossible for a Nova Extension.

## Version 1.0.4

New: Optional, per project output-path preference. Use if you want to save the compiled .css files into a specific folder. You set this in Nova via the "Project"-Menu.

## Version 1.0.1 to 1.0.3

Had to learn how Nova Extensions work and that:

- Uploading an Extension from within Nova breaks, if the project includes softlinks
- Execute Permissions are not kept when uploading an Extensions, thus i can not deliver the lessc binary with the extension, as it lost the execute-bit when the extension was uploaded/installed.
	
So, you now need to install your own version of lessc. Instructions see the Details/README.

## Version 1.0

Initial release

