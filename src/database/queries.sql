CREATE DATABASE IF NOT EXISTS `hotel-miranda` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION = 'N' */;
USE `hotel-miranda`;

CREATE TABLE if not exists `users`
(
    'id'             varchar(6)                                                        NOT NULL,
    'photo'          varchar(255)                                                      NOT NULL,
    'name'           varchar(20)                                                       NOT NULL,
    'email'          varchar(255)                                                      NOT NULL,
    'phone'          varchar(255)                                                      NOT NULL,
    'startDate'      varchar(10)                                                       NOT NULL,
    'state'          enum ('ACTIVE','INACTIVE')                                        NOT NULL,
    'password'       varchar(255)                                                      NOT NULL,
    'jobDescription' varchar(255)                                                      NOT NULL,
    'position'       enum ('Manager', 'Recepcionist', 'Room Service', 'Administrator') NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE if not exists `contacts`
(
    'id'       varchar(6)   NOT NULL,
    'date'     varchar(10)  NOT NULL,
    'customer' JSON         NOT NULL,
    'password' varchar(255) NOT NULL,
    'subject'  varchar(30)  NOT NULL,
    'comment'  varchar(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE if not exists `rooms`
(
    'id'           varchar(6)                                                    NOT NULL,
    'roomType'     enum ('Single Bed', 'Double Bed', 'Double Superior', 'Suite') NOT NULL,
    'roomNumber'   varchar(10)                                                   NOT NULL,
    'description'  varchar(255)                                                  NOT NULL,
    'price'        decimal(10, 2)                                                NOT NULL,
    'offer'        int                                                           NOT NULL,
    'cancellation' varchar(255)                                                  NOT NULL,
    'thumbnail'    varchar(255)                                                  NOT NULL,
    'amenities'    JSON                                                          NOT NULL,
    'images'       JSON                                                          NOT NULL,
    'status'       enum ('AVAILABLE', 'BOOKED'),
    PRIMARY KEY (id)
);

CREATE TABLE if not exists `bookings`
(
    'id'             varchar(6)   NOT NULL,
    'name'           varchar(20)  NOT NULL,
    'orderDate'      varchar(10)  NOT NULL,
    'checkIn'        varchar(10)  NOT NULL,
    'checkOut'       varchar(10)  NOT NULL,
    'room'           varchar(6)   NOT NULL,
    'specialRequest' varchar(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (room) REFERENCES rooms (id)
);

