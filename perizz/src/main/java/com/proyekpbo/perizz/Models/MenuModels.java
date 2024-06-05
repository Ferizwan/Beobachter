package com.proyekpbo.perizz.Models;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity

@Getter
@Setter

@Table(name = "tbMenu")
public class MenuModels {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imageFileName;
    private String namaMenu;
    private String hargaMenu;




}
