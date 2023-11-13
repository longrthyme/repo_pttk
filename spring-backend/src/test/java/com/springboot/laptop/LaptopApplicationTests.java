//package com.springboot.laptop;
//
//import com.springboot.laptop.model.*;
//import com.springboot.laptop.model.enums.UserRoleEnum;
//import com.springboot.laptop.repository.*;
//import com.springboot.laptop.service.AmazonS3Service;
//import com.springboot.laptop.service.CategoryService;
//import com.springboot.laptop.service.ImportService;
//
//import org.assertj.core.api.Assertions;
//import org.hamcrest.MatcherAssert;
//import org.hamcrest.Matchers;
//import org.junit.Assert;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.test.annotation.Rollback;
//
//import java.util.*;
////
////@DataJpaTest
////@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
////@Transactional
//@SpringBootTest
//@Rollback(false)
//class LaptopApplicationTests {
//
////	@Test
////	void contextLoads() {
////	}
//
////	@Autowired
////	private TestEntityManager entityManager;
//
//	@Autowired
//	UserRoleRepository userRoleRepository;
//
//	@Autowired
//	CategoryRepository categoryRepository;
//
//	@Autowired
//	OrderRepository orderRepository;
//
//	@Autowired
//	ProductRepository productRepository;
//
//	@Autowired
//			AccountRepository accountRepository;
//
//
//	@Autowired
//	ImportService importService;
//
//	@Autowired
//			CustomerRepository customerRepository;
//
//
//	BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//	@Autowired
//	private CustomerRepository userRepository;
//	@Autowired
//	private AccountRepository employeeRepository;
//
//    @Autowired
//    private AmazonS3Service  amazonS3Service;
//
//	@Autowired
//	private CategoryService categoryService;
//	@Autowired
//	private ImportDetailRepository importRepository;
//
//	@Test
//	public void addNewRole() {
//		UserRoleEntity userRole = new UserRoleEntity();
//		userRole.setName(UserRoleEnum.ROLE_ADMIN);
//		userRole.setDescription("Quan tri vien");
//		userRoleRepository.save(userRole);
//	}
//
//	@Test
//	public void addNewRole1() {
//		UserRoleEntity userRole = new UserRoleEntity();
//		userRole.setName(UserRoleEnum.ROLE_EMPLOYEE);
//		userRole.setDescription("Nhan vien");
//		userRoleRepository.save(userRole);
//	}
//
//
//	@Test
//	public void addNewRole2() {
//		UserRoleEntity userRole = new UserRoleEntity();
//		userRole.setName(UserRoleEnum.ROLE_CUSTOMER);
//		userRole.setDescription("Khach hang");
//		userRoleRepository.save(userRole);
//	}
//
//
//	@Test
//	public void addNewUser() {
//		Account appClient = new Account();
//		List<UserRoleEntity> listRoles = new ArrayList<>();
//		if (userRoleRepository.findByName(UserRoleEnum.ROLE_ADMIN).isPresent()) {
//			UserRoleEntity role = userRoleRepository.findByName(UserRoleEnum.ROLE_ADMIN).get();
//			listRoles.add(role);
//		}
//		appClient.setRoles(listRoles);
//		appClient.setUsername("admin");
//		appClient.setEmail("admin2001@gmail.com");
//		appClient.setEnabled(true);
//		appClient.setPassword(passwordEncoder.encode("123456"));
//		accountRepository.save(appClient);
//	}
//
//    @Test
//    public void updateUser() {
//        Account account  = accountRepository.findByUsernameIgnoreCase("admin").get();
//
//        account.setPassword(passwordEncoder.encode("12345678"));
//        accountRepository.save(account);
//    }
//
//
//	@Test
//	public void addNewCustomer() {
//		Customer appClient = new Customer();
//		List<UserRoleEntity> listRoles = new ArrayList<>();
//		if (userRoleRepository.findByName(UserRoleEnum.ROLE_CUSTOMER).isPresent()) {
//			UserRoleEntity role = userRoleRepository.findByName(UserRoleEnum.ROLE_CUSTOMER).get();
//			listRoles.add(role);
//		}
//		appClient.setName("long2001 tran");
//		appClient.setUsername("customer");
//		appClient.setEmail("customer2001@gmail.com");
//		appClient.setEnabled(true);
//		appClient.setPassword(passwordEncoder.encode("123456"));
//		customerRepository.save(appClient);
//	}
//
//
////
////	@Test
////	public void getTopSaleCategory() {
////		List<Object[]> result = orderRepository.getCategoryRevenue();
////		for (Object[] row : result) {
////			Integer id = ((BigInteger) row[0]).intValue();
////			String categoryName = (String) row[1];
////			Integer total = ((BigInteger) row[2]).intValue();
////			// do something with the values
////			System.out.println("Value is " + " "+id + " " + categoryName + " " + total);
////		}
////	}
//
//	@Test
//	public void getBestSellerProducts() {
//
//
//		List<ProductEntity> products = productRepository.findBestSellerProducts();
//        MatcherAssert.assertThat(products.size(), Matchers.greaterThan(0));
//
//	}
//
//
//}
