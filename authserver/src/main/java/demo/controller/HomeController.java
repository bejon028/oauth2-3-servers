package demo.controller;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.security.Principal;

/**
 * Created by Bijon on 9/30/2016.
 */
@Controller
public class HomeController {

    @RequestMapping("/home")
    public ModelAndView home(ModelMap model) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        if(principal != null) {
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.addObject("userName", principal.getName());
            modelAndView.setViewName("home");
            return  modelAndView;
        }else {
            return new ModelAndView("/");
        }
    }

    @RequestMapping("/")
    public String index(ModelMap model) {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        System.out.println("============================");
//        System.out.println(authentication);
//        System.out.println(principal);
//        System.out.println("============================");
//        if (authentication != null
//                && authentication.isAuthenticated() == true
//                && (authentication instanceof AnonymousAuthenticationToken) == false) { // should also consider anonymous
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        if(principal !=null){
            model.addAttribute("userName", principal.getName());
            return "home";
        } else {
            return "index";
        }
    }
}
