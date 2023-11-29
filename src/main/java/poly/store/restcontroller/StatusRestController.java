package poly.store.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import poly.store.entity.Status;
import poly.store.services.StatusService;


@CrossOrigin("*")
@RestController
@RequestMapping("/rest/StatusOR")
public class StatusRestController {
	@Autowired
	StatusService statusService;
	

	
	
	@GetMapping()
	public List<Status> findAll(){
		return statusService.findAll();
	}
	
	@GetMapping("{statusid}")
	public Status getOne(@PathVariable("statusid") Integer statusid) {
		return statusService.findById(statusid);
	}

	@PostMapping
	public Status create(@RequestBody Status status) {
		return statusService.create(status);
	}

	@PutMapping("{statusid}")
	public Status update(@PathVariable("statusid") Integer statusid, @RequestBody Status status) {
		return statusService.update(status);
	}

	@DeleteMapping("{statusid}")
	public void delete(@PathVariable("statusid") Integer statusid) {
		statusService.delete(statusid);
	}
}
