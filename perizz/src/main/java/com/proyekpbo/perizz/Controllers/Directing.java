package com.proyekpbo.perizz.Controllers;

import com.proyekpbo.perizz.Models.KomenDto;
import com.proyekpbo.perizz.Models.KomenModels;
import com.proyekpbo.perizz.Models.MenuDto;
import com.proyekpbo.perizz.Models.MenuModels;
import com.proyekpbo.perizz.Repository.KomenRepository;
import com.proyekpbo.perizz.Repository.MenuRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;

@Controller
public class Directing {


    @Autowired
    private MenuRepository menurepo;

    @Autowired
    private KomenRepository komenrepo;

    @GetMapping("/")
    public String directing(Model model) {

        List<MenuModels> Menu = menurepo.findAll();
        model.addAttribute("menus", Menu);

        List<KomenModels> komen = komenrepo.findAll();
        model.addAttribute("komens", komen);

        KomenDto komenDto = new KomenDto();
        model.addAttribute("komenDto", komenDto);

        return "index";
    }


    @GetMapping("/readmin")
    public String readmin(Model model) {
        return "DashboardAdmin";
    }

    @PostMapping("/createKomen")
    public String CreateMenu(@Valid @ModelAttribute KomenDto komenDto){



        KomenModels komen = new KomenModels();

        komen.setKomentar(komenDto.getKomentar());
        komen.setStatus(false);

        komenrepo.save(komen);

        return "redirect:/";
    }


    @GetMapping("/feedbacks")
    public String koment(Model model) {

        List<KomenModels> komen = komenrepo.findAll();
        model.addAttribute("komens", komen);


        return "menufeedback";
    }
}
