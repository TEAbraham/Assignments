-- Access Sakila Database
USE	sakila;

-- 1a. Display the first and last names of all actors from the table actor.
SELECT first_name, last_name FROM actor;

-- 1b. Display the first and last name of each actor in a single column in upper case letters. Name the column Actor Name.
SELECT CONCAT_WS(' ',first_name, last_name) AS 'Actor Name' FROM actor;

-- 2a. You need to find the ID number, first name, and last name of an actor, of whom you know only the first name, "Joe." What is one query would you use to obtain this information?
SELECT * FROM actor
WHERE first_name='JOE';

-- 2b. Find all actors whose last name contain the letters GEN:
SELECT * FROM actor
WHERE last_name LIKE '%GEN%';

-- 2c. Find all actors whose last names contain the letters LI. This time, order the rows by last name and first name, in that order:
SELECT last_name, first_name FROM actor
WHERE last_name LIKE '%LI%';

-- 2d. Using IN, display the country_id and country columns of the following countries: Afghanistan, Bangladesh, and China:
SELECT country_id, country FROM country
WHERE country IN('Afghanistan', 'Bangladesh', 'China');

-- 3a. Add a middle_name column to the table actor. Position it between first_name and last_name. Hint: you will need to specify the data type.
ALTER TABLE actor
	ADD middle_name VARCHAR(255) AFTER first_name;
    
-- 3b. You realize that some of these actors have tremendously long last names. Change the data type of the middle_name column to blobs.
ALTER TABLE actor 
	MODIFY COLUMN middle_name BLOB;

-- 3c. Now delete the middle_name column.
ALTER TABLE actor
	DROP middle_name;
    
-- 4a. List the last names of actors, as well as how many actors have that last name.
SELECT last_name, COUNT(last_name)  AS count FROM  actor GROUP BY last_name;

-- 4b. List last names of actors and the number of actors who have that last name, but only for names that are shared by at least two actors
SELECT last_name, COUNT(last_name)  AS count FROM actor GROUP BY last_name HAVING count(*) > 1;

-- 4c. Oh, no! The actor HARPO WILLIAMS was accidentally entered in the actor table as GROUCHO WILLIAMS, the name of Harpo's second cousin's husband's yoga teacher. Write a query to fix the record.
UPDATE actor
SET first_name='HARPO'
WHERE first_name='GROUCHO' AND last_name='WILLIAMS';

-- 4d. Perhaps we were too hasty in changing GROUCHO to HARPO. It turns out that GROUCHO was the correct name after all! In a single query, if the first name of the actor is currently HARPO, change it to GROUCHO. Otherwise, change the first name to MUCHO GROUCHO, as that is exactly what the actor will be with the grievous error. BE CAREFUL NOT TO CHANGE THE FIRST NAME OF EVERY ACTOR TO MUCHO GROUCHO, HOWEVER! (Hint: update the record using a unique identifier.)
UPDATE actor
SET first_name= CASE WHEN first_name='HARPO' THEN 'GROUCHO' ELSE 'MUCHO GROUCHO' END
WHERE actor_id=172;

-- 5a. You cannot locate the schema of the address table. Which query would you use to re-create it?
 CREATE TABLE IF NOT EXISTS address(
	address_id SMALLINT(5) NOT NULL AUTO_INCREMENT,
    address VARCHAR(50) NOT NULL,
    address2 VARCHAR(50),
    district VARCHAR(50) NOT NULL,
    city_id SMALLINT(5) NOT NULL,
    postal_code VARCHAR(10),
    phone VARCHAR(20) NOT NULL,
    location GEOMETRY NOT NULL,
    last_update TIMESTAMP NOT NULL,
    PRIMARY KEY (address_id),
    FOREIGN KEY (city_id) REFERENCES city(city_id));
    

-- 6a. Use JOIN to display the first and last names, as well as the address, of each staff member. Use the tables staff and address:
SELECT staff.first_name, staff.last_name, address.address, address.district, address.city_id 
FROM address
JOIN staff ON
staff.address_id=address.address_id;

-- 6b. Use JOIN to display the total amount rung up by each staff member in August of 2005. Use tables staff and payment.
SELECT x.first_name, x.last_name, y.August_2005
FROM (SELECT * FROM staff) x
INNER JOIN (SELECT staff_id, SUM(amount) AS August_2005 FROM payment WHERE payment_date LIKE '2005-08%' GROUP BY staff_id) y
ON x.staff_id = y.staff_id;

-- 6c. List each film and the number of actors who are listed for that film. Use tables film_actor and film. Use inner join.
SELECT x.title, y.number_of_actors
FROM (SELECT * FROM film) x
INNER JOIN (SELECT film_id, COUNT(actor_id) AS number_of_actors FROM film_actor GROUP BY film_id) y
ON x.film_id=y.film_id;

-- 6d. How many copies of the film Hunchback Impossible exist in the inventory system?
SELECT x.title, y.copies 
FROM (SELECT film_id, title FROM film WHERE title='Hunchback Impossible') x
LEFT JOIN (SELECT film_id, COUNT(inventory_id) AS copies FROM inventory GROUP BY film_id) y
ON x.film_id=y.film_id;

-- 6e. Using the tables payment and customer and the JOIN command, list the total paid by each customer. List the customers alphabetically by last name
SELECT x.last_name, y.total_paid 
FROM (SELECT customer_id, last_name FROM customer) x
LEFT JOIN (SELECT customer_id, SUM(amount) AS total_paid FROM payment GROUP BY customer_id) y
ON x.customer_id=y.customer_id;

-- 7a. The music of Queen and Kris Kristofferson have seen an unlikely resurgence. As an unintended consequence, films starting with the letters K and Q have also soared in popularity. Use subqueries to display the titles of movies starting with the letters K and Q whose language is English.
SELECT title FROM film
WHERE title IN(	
	SELECT title FROM film 
	WHERE title LIKE 'K%' OR title LIKE 'Q%') 
AND language_id=1;

-- 7b. Use subqueries to display all actors who appear in the film Alone Trip.
SELECT first_name, last_name FROM actor
WHERE actor_id IN(
	SELECT actor_id FROM film_actor
	WHERE film_id IN(
		SELECT film_id FROM film
		WHERE title = 'ALONE TRIP'));
        
-- 7c. You want to run an email marketing campaign in Canada, for which you will need the names and email addresses of all Canadian customers. Use joins to retrieve this information.
SELECT first_name, last_name, email FROM customer
WHERE address_id IN(
	SELECT address_id FROM address
    WHERE city_id IN(
		SELECT city_id FROM city
        WHERE country_id=(
			SELECT country_id FROM country
            WHERE country='Canada')));

-- 7d. Sales have been lagging among young families, and you wish to target all family movies for a promotion. Identify all movies categorized as famiy films.
SELECT title AS Family_Films FROM film
WHERE film_id IN(
	SELECT film_id FROM film_category
    WHERE category_id IN(
		SELECT category_id FROM category
        WHERE name='Family'));

-- 7e. Display the most frequently rented movies in descending order.
SELECT title, COUNT(rental_id) AS rentals FROM rental 
RIGHT JOIN inventory 
ON rental.inventory_id=inventory.inventory_id
RIGHT JOIN film
ON inventory.film_id=film.film_id
GROUP BY title
ORDER BY rentals DESC;

-- 7f. Write a query to display how much business, in dollars, each store brought in.
SELECT store.store_id, SUM(amount) AS income FROM store
JOIN staff
ON store.manager_staff_id=staff.staff_id
LEFT JOIN payment
ON staff.staff_id=payment.staff_id
GROUP BY store.store_id;

-- 7g. Write a query to display for each store its store ID, city, and country.
SELECT store.store_id, city.city, country.country FROM store
INNER JOIN address
ON store.address_id=address.address_id
INNER JOIN city
ON address.city_id=city.city_id
INNER JOIN country
ON city.country_id=country.country_id;


-- 7h. List the top five genres in gross revenue in descending order. (Hint: you may need to use the following tables: category, film_category, inventory, payment, and rental.)
SELECT category.name AS Genre, SUM(payment.amount) AS Gross FROM payment
INNER JOIN rental
ON payment.rental_id=rental.rental_id
RIGHT JOIN inventory
ON rental.inventory_id=inventory.inventory_id
RIGHT JOIN film_category
ON inventory.film_id=film_category.film_id
RIGHT JOIN category
ON film_category.category_id=category.category_id
GROUP BY Genre
ORDER BY Gross DESC
LIMIT 5;

-- 8a. In your new role as an executive, you would like to have an easy way of viewing the Top five genres by gross revenue. Use the solution from the problem above to create a view. If you haven't solved 7h, you can substitute another query to create a view.
CREATE VIEW top_genres AS
SELECT category.name AS Genre, SUM(payment.amount) AS Gross FROM payment
INNER JOIN rental
ON payment.rental_id=rental.rental_id
RIGHT JOIN inventory
ON rental.inventory_id=inventory.inventory_id
RIGHT JOIN film_category
ON inventory.film_id=film_category.film_id
RIGHT JOIN category
ON film_category.category_id=category.category_id
GROUP BY Genre
ORDER BY Gross DESC
LIMIT 5;


-- 8b. How would you display the view that you created in 8a?
SELECT * FROM top_genres;

-- 8c. You find that you no longer need the view top_five_genres. Write a query to delete it.
DROP VIEW top_genres;