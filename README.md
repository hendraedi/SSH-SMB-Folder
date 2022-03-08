# SSH for access SMB Directory with Terminal

This is application for private usage, but if you want to use this extension, you can download it.

I'm use SSH server on Raspberry Pi and SMB Folder on Raspberry Pi.

I'm build this extension for access smb folder on remote server via remote terminal, because i'm access some smb folder with new remote drive in windows like drive Z: and then i'm use this smb folder for developing website application with Laravel Vallet.

I get bored every time developing some application i must write some command in terminal for use command like `php artisan migrate` and etc on the remote terminals.

## Features

Access remote SMB folder with remote terminal.

## Requirements

- Install putty/ssh on your computer.
- This tested on VScode for Windows only.
- This tested and connected to SSH Server without `keyFile`.
- This never tested with `keyFile` but you can test if is work.
- Tested on SSH Server at Linux.
For usage this extension:

<!-- \!\[feature X\]\(images/feature-x.png\) -->

> Note: Please install putty/ssh in your computer and you open the setting extension on VScode, you need configure this extension before you use.

## Extension Settings

You need configure before use this extension, `sshSmbFolder.connection` is extension point.

For example:

This extension you need the following settings:

* `sshSmbFolder.connection.name`: write something for the name connection.
* `sshSmbFolder.connection.user`: write your username for connect the remote server via SSH.
* `sshSmbFolder.connection.password`: write your password for connect the remote server via SSH.
* `sshSmbFolder.connection.host`: write your IP-Address or URL for connect the remote server via SSH.
* `sshSmbFolder.connection.port`: write your Open-port for connect the remote server via SSH.
* `sshSmbFolder.connection.enableKeyFile`: Enable/disable for connect SSH with some keyFile you create on the server.
* `sshSmbFolder.connection.keyFile`: write your path included name of keyFile on your computer drive.
* `sshSmbFolder.connection.prefixPath`: write your path folder in remote server, where you use SMB Folder active.
* `sshSmbFolder.connection.delay`: write your delay for connecting the remote server before the command use in terminal automatic like for Login and change path for your terminal.

## Known Issues

Calling me if you have idea and have some code for compability the other operating system.

But maybe i'm not fast response or response your call if not insterested.

## Release Notes

This first release for extension.

### 0.0.1

Initial release

-----------------------------------------------------------------------------------------------------------
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for use this extension.

### For more information

* [Hendra Eddy](https://github.com/hendraedi/)
* [Email to Hendra Eddy](mailto:hendra_eddy@ymail.com)

**Enjoy!**
