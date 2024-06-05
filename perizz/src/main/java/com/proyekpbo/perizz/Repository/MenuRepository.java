package com.proyekpbo.perizz.Repository;

import com.proyekpbo.perizz.Models.MenuModels;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuRepository  extends JpaRepository<MenuModels, Long> {
}
