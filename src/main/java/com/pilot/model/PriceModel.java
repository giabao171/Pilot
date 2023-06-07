package com.pilot.model;

public class PriceModel {

	private double priceFrom;
	private double priceTo;

	public PriceModel() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PriceModel(int priceFrom, int priceTo) {
		super();
		this.priceFrom = priceFrom;
		this.priceTo = priceTo;
	}

	/**
	 * @return the priceFrom
	 */
	public double getPriceFrom() {
		return priceFrom;
	}

	/**
	 * @param priceFrom the priceFrom to set
	 */
	public void setPriceFrom(int priceFrom) {
		this.priceFrom = priceFrom;
	}

	/**
	 * @return the priceTo
	 */
	public double getPriceTo() {
		return priceTo;
	}

	/**
	 * @param priceTo the priceTo to set
	 */
	public void setPriceTo(int priceTo) {
		this.priceTo = priceTo;
	}

}
