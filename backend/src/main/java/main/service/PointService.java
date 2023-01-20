package main.service;

import main.models.Point;
import main.models.User;
import main.repositories.PointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class PointService {

    private static final double X_MAX = 5;
    private static final double X_MIN = -3;
    private static final double Y_MAX = 5;
    private static final double Y_MIN = -3;
    private static final double R_MAX = 5;
    private static final double R_MIN = 1;

    @Autowired
    private PointRepository pointRepository;

    public Point save(Point point){
        point.setCurrentTime(System.currentTimeMillis());
        boolean isInArea = isPointInArea(point);
        if (isInArea) {
            point.setHit(true);
        }
        System.out.println(point);
        pointRepository.save(point);
        return pointRepository.save(point);
    }

    @Transactional
    public Collection<Point> findByUser(User user){
        return pointRepository.findByUser(user);
    }

    @Transactional
    public void clear(User user){
        pointRepository.deleteByUser(user);
    }

    public boolean isInCircle(double x, double y, double R) {
        if(x<=0 && y>=0){
            if((x*x + y*y) <= R*R){
                return true;
            }
        }
        return false;
    }

    public boolean isInTriangle(double x, double y, double R) {
        if(x<=0 && y<=0){
            if(y >= -R -2*x ){
                return true;
            }
        }
        return false;
    }

    public boolean isInRectangle(double x, double y, double R) {
        if(x>=0 && y<=0){
            if(x<=R/2 && y>=-R){
                return true;
            }
        }
        return false;
    }

    public boolean isPointInArea(Point point) {
        double x = point.getX();
        if (x > X_MAX || x < X_MIN) {
            throw new IllegalArgumentException("X is out of range");
        }
        double y = point.getY();
        if (y > Y_MAX || y < Y_MIN) {
            throw new IllegalArgumentException("Y is out of range");
        }
        double R = point.getR();
        if (R > R_MAX || R < R_MIN) {
            throw new IllegalArgumentException("R is out of range");
        }
        if (isInCircle(x,y,R)) return true;
        if (isInTriangle(x,y,R)) return true;
        if (isInRectangle(x,y,R)) return true;
        return false;
    }

}
