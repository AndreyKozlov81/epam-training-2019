package by.epam.courses.model.beans;

import java.util.Set;

/**
 * This class describes the fields and methods of the menu object
 * 
 * @author AndreyKazlou
 * @version 1.0
 **/
public class Menu {
	private Set<Dish> dishes;

	public Menu() {
		super();
	}

	public Menu(Set<Dish> dishes) {
		super();
		this.dishes = dishes;
	}

	public Set<Dish> getDishes() {
		return dishes;
	}

	public void setDishes(Set<Dish> dishes) {
		this.dishes = dishes;
	}
	
	
}
