package main.repositories;

import main.models.Point;
import main.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface PointRepository extends JpaRepository<Point, Integer> {
    Collection<Point> findByUser(User user);
    void deleteByUser(User user);
}
