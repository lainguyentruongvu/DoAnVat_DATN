package poly.store.services;

import java.util.List;

import poly.store.entity.Status;

public interface StatusService {

	Status getOne(Integer newStatusId);

	List<Status> findAll();
	Status create(Status status);
	Status update(Status status);
	void delete(Integer statusid);
}
