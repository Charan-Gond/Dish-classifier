package com.chr.Dish_classifier.service;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@Service
public class ModelService {

    public String sendDishClassifier(MultipartFile imageFile) throws Exception {

        String url="http://127.0.0.1:8000/predict";

        RestTemplate restTemplate=new RestTemplate();

        HttpHeaders headers=new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        try {
            ByteArrayResource fileAsResource = new ByteArrayResource(imageFile.getBytes()) {

                @Override
                public String getFilename() {
                    return imageFile.getOriginalFilename();
                }
            };

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("file", fileAsResource);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);


            return response.getBody();
        }catch (Exception e){
            throw new Exception(" model is not working try again");
        }
    }
}
