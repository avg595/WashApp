package net.javaguides.springboot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.javaguides.springboot.model.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long>{
	Optional<Image> findByProductId(Long productId);
	
}
