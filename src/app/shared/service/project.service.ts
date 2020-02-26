import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Project, ProjectFilter} from '../../components/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private baseUrl = 'http://localhost:8080/project';

  constructor(private http: HttpClient) {

  }

  save(request: Project) {
    return this.http.post<Project>(`${this.baseUrl}/create`, request);
  }

  search(filter: ProjectFilter) {
    return this.http.get<Project[]>(`${this.baseUrl}/search`, {params: this.createHttpParams(filter)})
  }

  private createHttpParams(filter: ProjectFilter) {
    let params = new HttpParams();
    if (filter.description) {
      params = params.append('description', filter.description);
    }
    if (filter.titile) {
      params = params.append('titile', filter.titile);
    }
    return params;
  }


}
