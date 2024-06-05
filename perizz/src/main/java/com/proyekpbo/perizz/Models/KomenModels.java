package com.proyekpbo.perizz.Models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Getter
@Setter
@Entity
@Table(name = "tbKomen")
public class KomenModels {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String komentar;
    private boolean status;
}
