/**
 * 
 */
package com.pilot.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;
import com.pilot.common.constant.Constants;
import com.pilot.common.util.CommonUtil;

/**
 * @author USER
 *
 */
@Entity
@Table(name = "product")
public class ProductEntity {

	@Id
	@Column(name = "product_id", nullable = false)
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long productId;

	@Column(name = "product_name", nullable = false, unique = true)
	private String productName;

	@Column(name = "quantity", nullable = true)
	private int quantity;

	@Column(name = "price", nullable = true)
	private double price;

	@Column(name = "sale_date", nullable = true)
	private Date saleDate;

	@Transient
	private MultipartFile[] imageFiles;

	/**
	 * @return the imageFiles
	 */
	public MultipartFile[] getImageFiles() {
		return imageFiles;
	}

	/**
	 * @param imageFiles the imageFiles to set
	 */
	public void setImageFiles(MultipartFile[] imageFiles) {
		this.imageFiles = imageFiles;
	}

	@Column(name = "image", nullable = true)
	private String image;

	@Column(name = "description", nullable = true)
	private String description;

	@ManyToOne
	@JoinColumn(name = "brand_id", nullable = true)
	private BrandEntity brand;

	/**
	 * @return the brand
	 */
	public BrandEntity getBrand() {
		return brand;
	}

	/**
	 * @param brand the brand to set
	 */
	public void setBrand(BrandEntity brand) {
		this.brand = brand;
	}

	/**
	 * @return the brandId
	 */
	public Long getProductId() {
		return productId;
	}

	/**
	 * @param brandId the brandId to set
	 */
	public void setProductId(Long productId) {
		this.productId = productId;
	}

	/**
	 * @return the productName
	 */
	public String getProductName() {
		return productName;
	}

	/**
	 * @param productName the productName to set
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}

	/**
	 * @return the quantity
	 */
	public int getQuantity() {
		return quantity;
	}

	/**
	 * @param quantity the quantity to set
	 */
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	/**
	 * @return the price
	 */
	public double getPrice() {
		return price;
	}

	/**
	 * @param price the price to set
	 */
	public void setPrice(double price) {
		this.price = price;
	}

	/**
	 * @return the saleDate
	 */
	public String getSaleDate() {
		return CommonUtil.cvDateToString(saleDate, Constants.DATE_FORMAT_FOR_ddMMyy);
	}

	/**
	 * @param saleDate the saleDate to set
	 */
	public void setSaleDate(String saleDate) {
		this.saleDate = CommonUtil.cvStringToDate(saleDate, Constants.DATE_FORMAT_FOR_ddMMyy);
	}

	/**
	 * @return the image
	 */
	public String getImage() {
		return image;
	}

	/**
	 * @param image the image to set
	 */
	public void setImage(String image) {
		this.image = image;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

}
