package by.epam.courses.model.interfaces;

import java.util.List;

import by.epam.courses.model.beans.Dish;

public interface MenuDAO {
	int addDish(Dish dish);
	Dish getDishById(int idDish);
	List<Dish> getAllDishes();
	boolean deleteDish(int idDish);
	boolean updateDish(int idDish, Dish dish);
}
