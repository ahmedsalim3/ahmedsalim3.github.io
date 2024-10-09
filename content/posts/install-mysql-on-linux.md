---
date: 2023-01-10 19:20:00 +0800
title: "Install MySQL on Linux via Terminal"
categories:
  - Database Management
  - RDBMS
pin: false
render_with_liquid: false
tags:
  - MySQL
  - Linux
  - Installation
  - Ubuntu
includes_code: yes
includes_math: yes
---

In this guide, you'll learn how to install and configure MySQL on a Linux system. 
If you already have a previous version of MySQL installed, you will need to clean it up before proceeding.

## Clean Up Existing MySQL Installation

- [ ] Remove MySQL and Related Packages

    ```sh
    sudo apt-get purge mysql-server mysql-client mysql-common mysql-server-core-* mysql-client-core-*
    sudo apt-get autoremove
    sudo apt-get autoclean
    ```

- [ ] Set Up MySQL Directories and Permissions

    ```sh
    sudo mkdir -p /var/lib/mysql
    sudo mkdir -p /var/run/mysqld
    sudo chown -R mysql:mysql /var/lib/mysql
    sudo chown -R mysql:mysql /var/run/mysqld
    sudo chmod 750 /var/run/mysqld
    ```


## Install MySQL

1. Update Package Lists and Install MySQL

    ```sh
    sudo apt-get update
    sudo apt-get install mysql-server
    ```

2. Initialize MySQL

    ```sh
    sudo mysqld --initialize --user=mysql --datadir=/var/lib/mysql
    ```

3. Start MySQL Service

    ```sh
    sudo systemctl start mysql
    ```

4. Check MySQL Status and Logs

    Verify that MySQL is running:

    ```sh
    sudo systemctl status mysql
    ```

5. Secure the Installation

    ```sh
    sudo mysql_secure_installation
    ```

6. Log In with the Temporary Password

    Use the temporary password generated during installation:

    ```sh
    sudo mysql -u root -p
    ```

{{< notice info "Note" >}}
The temporary password will be shown during the installation. If you missed it, you can find it in the logs:
{{< /notice >}}

- [ ] Viewing MySQL error logs

    ```sh
    sudo less /var/log/mysql/error.log
    ```

_Look for a line that's similar to: `A temporary password is generated for root@localhost: TEMP_PASSWORD`_

## Resetting the Root Password

If you stll can't find the temporary password, or if you need to reset it, follow these steps:

- [x] Stop the MySQL Service

    ```sh
    sudo systemctl stop mysql
    ```

- [x] Start MySQL in Safe Mode

    ```sh
    sudo mysqld_safe --skip-grant-tables &
    ```

- [ ] Create the MySQL Run Directory (if necessary)
    
    If `/var/run/mysqld` doesn't exist, create it:
    
    ```sh
    sudo mkdir -p /var/run/mysqld
    sudo chown mysql:mysql /var/run/mysqld
    ```

- [x] Log Into MySQL Without a Password

    ```sh
    mysql -u root 
    ```

- [x] Reset the Root Password

    Execute the following commands in the MySQL prompt:

    ```sql
    FLUSH PRIVILEGES;
    ALTER USER 'root'@'localhost' IDENTIFIED BY 'YOUR_NEW_PASSWORD'; -- Replace YOUR_NEW_PASSWORD with your new password
    EXIT;
    ```

- [x] Stop MySQL Safe Mode

    ```sh
    sudo killall mysqld_safe
    ```

- [x] Restart MySQL

    ```sh
    sudo systemctl start mysql
    ```

- [x] Log In with the New Password

    ```sh
    mysql -u root -p
    ```

## References

[Install MySQL on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04)

[Ubuntu Server](https://ubuntu.com/server/docs/install-and-configure-a-mysql-server)