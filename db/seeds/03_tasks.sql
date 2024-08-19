-- Books. To read 1 --
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (3, 'All the Light we cannot see','by Anthony Doerr', 1);
INSERT INTO tasks (user_id, name, description, category_id, is_completed)
  VALUES (3, 'To Kill a Mockingbird','book by Harper Lee', 1, 'true');
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (1, 'Gone with the Wind','by Margaret Mitchell', 1);
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (2, 'The Heiress','book by Rachel Hawkins', 1);
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (2, 'The Fury','by Alex Michaelides', 1);

-- Films/TV Series. To watch 2 --
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (3, 'Star Wars', 'To watch Star Wars in order', 2);
INSERT INTO tasks (user_id, name, category_id)
  VALUES (3, 'Naruto', 2);
INSERT INTO tasks (user_id, name, category_id)
  VALUES (1, 'Forest Gump', 2);
INSERT INTO tasks (user_id, name, category_id)
  VALUES (1, 'Moana', 2);
INSERT INTO tasks (user_id, name, category_id)
  VALUES (2, 'A Beautiful Mind', 2);

-- Products / To Buy 3 --
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (3, 'Printer', 'Brand to consider: Canon or HP', 3);
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (3, 'Wine', 'to buy a bottle of red wine', 3);
INSERT INTO tasks (user_id, name, description, category_id, is_completed )
  VALUES (3, 'Bag', 'Sling and color black', 3, 'true');
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (1, 'buy laptop', 'OS: Windows or Mac. Visit computer store to get more info', 3);
INSERT INTO tasks (user_id, name, description, category_id, is_completed)
  VALUES (1, 'Soda', 'Pepsi', 3, 'true');
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (2, 'Milk', '2%', 3);
INSERT INTO tasks (user_id, name, description, category_id, is_completed)
  VALUES (2, 'Coffee beans', 'Organic and medium roast', 3, 'true');

-- Restaurants. To eat 4 --
INSERT INTO tasks (user_id, name, category_id)
  VALUES (3, 'Boston Pizza', 4);
INSERT INTO tasks (user_id, name, category_id)
  VALUES (3, 'Gyubee Japanese Grill', 4);
INSERT INTO tasks (user_id, name, category_id)
  VALUES (3, 'Pizza Hut', 4);
INSERT INTO tasks (user_id, name, category_id)
  VALUES (1, 'Main Street Cafe', 4);
INSERT INTO tasks (user_id, name, category_id, is_completed)
  VALUES (1, 'Baton Rouge Grill House', 4, 'true');
INSERT INTO tasks (user_id, name, category_id, is_completed)
  VALUES (2, 'Baton Rouge', 4, 'true');
INSERT INTO tasks (user_id, name, category_id, is_completed)
  VALUES (2, 'Ritual Cafe', 4, 'true');

-- Other. 5 --
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (3, 'laundry', 'Only white clothes', 5);
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (3, 'Play outside','To play volleyball with friends', 5);
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (1, 'Swimming','at Silverlake with friends', 5);
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (1, 'Climb Mt Everest','pack all gears', 5);
INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (2, 'Visit GrandMa','surprise visit', 5);







  INSERT INTO tasks (user_id, name, description, category_id)
  VALUES (1, 'Watch 911', 'To watch Starz 911 series', 1);

