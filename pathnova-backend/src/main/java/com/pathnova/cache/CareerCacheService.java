package com.pathnova.cache;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class CareerCacheService {

    private final RedisTemplate<String,Object> redisTemplate;

    public CareerCacheService(RedisTemplate<String,Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public Object get(String key){
        return redisTemplate.opsForValue().get(key);
    }

    public void set(String key,Object value){
        redisTemplate.opsForValue().set(key,value, Duration.ofMinutes(10));
    }

    public void delete(String key){
        redisTemplate.delete(key);
    }
}