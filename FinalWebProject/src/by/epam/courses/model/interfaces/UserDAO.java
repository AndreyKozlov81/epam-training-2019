package by.epam.courses.model.interfaces;

import by.epam.courses.model.beans.User;

public interface UserDAO {
	int addUser(User user);
	boolean deleteUser(int id);
	User getUserById(int id);
	User getUserByLoginAndPassword(String login, String password);
	boolean updateUser(int id, User user);
}
