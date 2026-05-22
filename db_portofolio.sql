-- SQL script to create a database for portfolio
CREATE DATABASE db_portofolio;
USE db_portofolio;

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    link VARCHAR(255) NOT NULL
);

-- Add sample data
INSERT INTO projects (title, description, link) VALUES
('Project 1', 'Description for project 1', 'http://example.com/project1'),
('Project 2', 'Description for project 2', 'http://example.com/project2');
