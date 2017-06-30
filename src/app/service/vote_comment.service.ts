import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';

@Injectable()
export class Vote_commentService {

	private urlBase:string = 'http://localhost:8080/ApiRestRepositorio/resources/Votes_comments';

	constructor(private http:Http){}

	getVotosByComment(id){
		console.log('Ejecutando servicio getVoteByUser');
		let url = this.urlBase + "/comment/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	getVotosPositivosByComment(id){
		console.log('Ejecutando servicio getVotosPositivosByComment');
		let url = this.urlBase + "/countVotePositive/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	getVotosNegativosByComment(id){
		console.log('Ejecutando servicio getVotosNegativosByComment');
		let url = this.urlBase + "/countVoteNegative/" + id;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	getByUserComment(idUser, idComment){
		console.log('Ejecutando servicio getByUserComment');
		let url = this.urlBase + "/" + idUser + "/" + idComment;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.get(url,options);
	}

	postVote_comment(vote_comment){
		console.log('Ejecutando servicio postVote_comment');
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.post(this.urlBase,vote_comment,options);
	}

	putVote_comment(idUser, idComment, vote_comment){
		console.log('Ejecutando servicio getByUserComment');
		let url = this.urlBase + "/" + idUser + "/" + idComment;
		let headers = new Headers();
		let options = new RequestOptions({ headers: headers, withCredentials: true});
		return this.http.put(url,vote_comment,options);
	}

}