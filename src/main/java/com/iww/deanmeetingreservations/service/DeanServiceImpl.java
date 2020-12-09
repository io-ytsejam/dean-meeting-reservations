package com.iww.deanmeetingreservations.service;

import com.iww.deanmeetingreservations.config.JwtTokenUtil;
import com.iww.deanmeetingreservations.dto.DeanLoginDto;
import com.iww.deanmeetingreservations.dto.TokenDto;
import com.iww.deanmeetingreservations.model.Dean;
import com.iww.deanmeetingreservations.model.Role;
import com.iww.deanmeetingreservations.repository.DeanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeanServiceImpl implements DeanService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private DeanRepository deanRepository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        Dean dean = deanRepository.findByEmail(email);
        if (dean == null) {
            throw new UsernameNotFoundException("Invalid email or password.");
        }
        return new org.springframework.security.core.userdetails.User(dean.getEmail(),
                dean.getPassword(),
                mapRolesToAuthorities(dean.getRoles()));
    }

    private Collection<? extends GrantedAuthority> mapRolesToAuthorities(List<Role> roles) {
        return roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());
    }

    @Override
    public Dean loadUserByEmail(String email) throws UsernameNotFoundException {
        Dean dean = deanRepository.findByEmail(email);
        if (dean == null) {
            throw new UsernameNotFoundException("Email not found");
        }
        return dean;
    }

    @Override
    public Boolean isLogged(String token) {
        token = token.substring(7);
        String email = jwtTokenUtil.getEmailFromToken(token);
        return jwtTokenUtil.validateToken(token, this.loadUserByUsername(email));
    }

    @Override
    public TokenDto loginDean(DeanLoginDto deanLoginDto) {
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        deanLoginDto.getEmail(),
                        deanLoginDto.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final Dean dean = this.loadUserByEmail(deanLoginDto.getEmail());
        final String token = jwtTokenUtil.generateToken(dean);
        return new TokenDto(token, dean.getEmail());
    }
}
