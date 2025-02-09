package com.xiwenteoh.bookstore.dao.daoimpl;

import com.xiwenteoh.bookstore.dao.BookDao;
import com.xiwenteoh.bookstore.entity.Book;
import com.xiwenteoh.bookstore.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<Book> findAll() {
        return bookRepository.findAll();
    }

    @Override
    public List<Book> findBooksByTitleContaining(String title, Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookRepository.findBooksByTitleContainingAndActiveTrue(title, pageable);
    }

    @Override
    public Optional<Book> findBookById(Integer id) {
        return bookRepository.findBookById(id);
    }

    @Override
    public Book save(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Integer deleteBookById(Integer id) {
        return bookRepository.deleteBookById(id);
    }

    @Override
    public Boolean existsBookById(Integer id){
        return bookRepository.existsBookById(id);
    }
}
