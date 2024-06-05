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

import java.awt.*;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@Controller
public class MenuController {

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private KomenRepository komenRepository;

    @GetMapping("/edit")
    public String edit(Model model) {
        List<MenuModels> Menu = menuRepository.findAll();
        model.addAttribute("menus", Menu);

        MenuDto menuDto = new MenuDto();
        model.addAttribute("menuDto", menuDto);


        return "menu";
    }



    @PostMapping("/createMenu")
    public String CreateMenu(
            @Valid @ModelAttribute MenuDto menuDto,
            BindingResult result){

        if (menuDto.getImageFile().isEmpty()){
            result.addError(new FieldError("menuDto","imageFile","the image file is missing"));
        }
        if (result.hasErrors()){
            return  "redirect:/fasilitas";
        }
//        add image
        MultipartFile image = menuDto.getImageFile();
        Date createAt = new Date();
        String storageFileName = createAt.getTime() + "_" + image.getOriginalFilename();
        try {
            String uploadDir = "public/images/";
            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)){
                Files.createDirectories(uploadPath);
            }
            try(InputStream inputStream = image.getInputStream()){
                Files.copy(inputStream, Paths.get(uploadDir + storageFileName),
                        StandardCopyOption.REPLACE_EXISTING);
            }

        }catch (Exception ex){
            System.out.println("Exception" + ex.getMessage());
        }

        MenuModels menu = new MenuModels();
        menu.setNamaMenu(menuDto.getNamaMenu());
        menu.setImageFileName(storageFileName);
        menu.setHargaMenu(menuDto.getHargaMenu());

        menuRepository.save(menu);

        return "redirect:/edit";
    }
    @GetMapping("/edit/{id}")
    @ResponseBody
    public ResponseEntity<MenuModels> getMenusById(@PathVariable long id) {
        MenuModels menu = menuRepository.findById(id).orElseThrow(() -> new RuntimeException("Menus not found"));
        return ResponseEntity.ok(menu);
    }

    @PostMapping("/update")
    public String updateFasilitas(
            @RequestParam long id,
            @RequestParam String nameFasilitas,
            @RequestParam String harga,
            @RequestParam("imageFileName") MultipartFile imageFileName) {
        try {
            MenuModels menu = menuRepository.findById(id).orElseThrow(() -> new RuntimeException("Fasilitas not found"));

            // Update nama fasilitas
            menu.setNamaMenu(nameFasilitas);
            menu.setHargaMenu(harga);

            // Jika ada file gambar baru, simpan file baru dan update nama file
            if (!imageFileName.isEmpty()) {
                String uploadDir = "public/images/";
                String storageFileName = new Date().getTime() + "_" + imageFileName.getOriginalFilename();
                Path uploadPath = Paths.get(uploadDir);

                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                try (InputStream inputStream = imageFileName.getInputStream()) {
                    Files.copy(inputStream, Paths.get(uploadDir + storageFileName), StandardCopyOption.REPLACE_EXISTING);
                    // Hapus file lama
                    Path oldImagePath = Paths.get(uploadDir + menu.getImageFileName());
                    Files.deleteIfExists(oldImagePath);
                    // Set nama file baru
                    menu.setImageFileName(storageFileName);
                }
            }

            menuRepository.save(menu);

        } catch (Exception ex) {
            System.out.println("Exception: " + ex.getMessage());
        }
        return "redirect:/edit";
    }

    @GetMapping("delete/{id}")
    public String deleteProduct(@PathVariable long id){

        try {
            MenuModels menu = menuRepository.findById(id).get();

            Path imagePath = Paths.get("public/images/" + menu.getImageFileName());

            try {
                Files.delete(imagePath);
            }catch (Exception ex){
                System.out.println("Exception" + ex.getMessage());
            }

            menuRepository.delete(menu);

        }
        catch (Exception ex){
            System.out.println("Exception" + ex.getMessage());


        }
        return "redirect:/edit";
    }


}
