package com.pilot.common.constant;

/**
 * This class is used to declare constant for project
 * 
 * @author Red Devil
 * @since 2020-10-10
 */
public class Constants {

	/** Common character */
	public static final String COMMON_UTF8 = "UTF-8";
	public static final String COMMON_SPACE = " ";
	public static final String COMMON_HYPHEN = "-";
	public static final String COMMON_SORT_ASC = "asc";
	public static final String COMMON_SORT_DESC = "desc";

	/** Date Format */
	public static final String DATE_FORMAT_FOR_FILE_NAME = "yyyyMMdd-HHmm";
	
	public static final String DATE_FORMAT_FOR_ddMMyy = "dd-MM-yyyy";

	/** Common property key */
	public static final String PROP_KEY_ROOT_FOLDER = "root.storage.folder";

	/** The number of record per each page */
	public static final int PAGE_SIZE = 5;
	
	public static final int PAGE_SIZE_PRODUCT = 10;

	/** Response Code */
	public static final int RESULT_CD_FAIL = 0;
	public static final int RESULT_CD_DUPL = 1;
	public static final int RESULT_CD_SUCCESS = 100;

	/** SALT CONST */
	public static final String SALT_CONST = "!#$%^&*!#$%^&*";
	
	/**PRODUCT ARRANGE */
	public static final int MIN_TO_MAX_PRICE = 2;
	public static final int MAX_TO_MIN_PRICE = 3;
	public static final int LASTED = 1;
}