
CREATE DATABASE IF NOT EXISTS bookieDB;

USE bookieDB;

create table matches (
    match_id int not null auto_increment,
    primary key (match_id),
	match_name varchar(255) not null,
    match_start varchar(255) not null, 
    match_end varchar(255) not null, 
    team_A varchar(255) not null,
    team_B varchar(255) not null,
    match_odds float not null default 0.5,
    match_result boolean not null
)

create table accounts (
    account_id int not null auto_increment,
    primary key (account_id),
	account_name varchar(255) not null,
    account_points int not null,
    wagers_current varchar(255) not null,
    wagers_history varchar(255) not null
)

create table admin_current (
    match_id int not null,
    primary key (match_id),
    match_wager int not null
)

create table admin_history (
    match_id int not null,
    primary key (match_id),
    match_wager int not null,
    wager_returns int not null
)