package net.javaguides.springboot.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.CartDetail;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Long>{
	List<CartDetail> findByCartId(Long cartId);
	Optional<CartDetail> findCartDetailByCartIdAndProductId(Long cartId, Long productId);
	//List<CartDetail> findCartDetailByCartId(Long cartId);	
	int deleteByCartId(Long cartId);
}
