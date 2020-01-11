package by.epam.courses.interfaces;

import by.epam.courses.beans.User;

public interface UserDAO {
	User getUser(String name, String password);
	User getUserById(int id);
	boolean addUser(User user);
}
