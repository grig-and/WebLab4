package main.models;

import javax.persistence.*;

@Entity
@Table(name = "points")
public class Point {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double x;
    private double y;
    private double R;
    private boolean hit;
    private long executionTime;
    private long time;

    @ManyToOne
    private User user;

    public Point() {
    }

    public Point(double x, double y, double R) {
        this.x = x;
        this.y = y;
        this.R = R;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return R;
    }

    public void setR(double R) {
        this.R = R;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public long getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(long executionTime) {
        this.executionTime = executionTime;
    }

    public long getCurrentTime() {
        return time;
    }

    public void setCurrentTime(long currentTime) {
        this.time = currentTime;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Point{" +
                "id=" + id +
                ", x=" + x +
                ", y=" + y +
                ", R=" + R +
                ", hit=" + hit +
                ", executionTime=" + executionTime +
                ", time=" + time +
                ", user=" + user +
                '}';
    }
}
