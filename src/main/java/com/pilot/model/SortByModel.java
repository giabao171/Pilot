package com.pilot.model;

public class SortByModel {
	private int id;
	
	public SortByModel(int id) {
		super();
		this.id = id;
	}

	public SortByModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return the sortBy
	 */
	public static String getSortBy(int id) {
		String sort = "productId";
		if(id == 1 )
			sort = 	"productId";
		if(id == 2 || id == 3)
			sort = 	"price";
		return sort;
			
	}

	
	
}
