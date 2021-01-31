package net.javaguides.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.CartDetail;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail, Long>{

}
