package com.proyekpbo.perizz.Models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class MenuDto {
    private MultipartFile ImageFile;
    private String namaMenu;
    private String hargaMenu;


 }
