package com.demoapp.demo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.demoapp.demo.model.UserPostReaction;
import com.demoapp.demo.repository.UserPostReactionRepository;

@ExtendWith(MockitoExtension.class)
class PostServiceMockitoTest {

  @Mock
  private UserPostReactionRepository reactionRepository;

  private PostService postService;

  @BeforeEach
  void setUp() {
    postService = new PostService(reactionRepository);
  }

  @Test
  void shouldLikePostWhenReactionDoesNotExist() {
    when(reactionRepository.findByUserIdAndPostId(7L, 10L)).thenReturn(Optional.empty());

    Map<String, Object> result = postService.toggleLike(10L, 7L);

    assertEquals(10L, result.get("postId"));
    assertTrue((Boolean) result.get("liked"));
    verify(reactionRepository).save(any(UserPostReaction.class));
    verify(reactionRepository, never()).delete(any(UserPostReaction.class));
  }

  @Test
  void shouldUnlikePostWhenReactionAlreadyExists() {
    UserPostReaction reaction = new UserPostReaction();
    reaction.setId(1L);
    reaction.setUserId(7L);
    reaction.setPostId(10L);

    when(reactionRepository.findByUserIdAndPostId(7L, 10L)).thenReturn(Optional.of(reaction));

    Map<String, Object> result = postService.toggleLike(10L, 7L);

    assertEquals(10L, result.get("postId"));
    assertEquals(false, result.get("liked"));
    verify(reactionRepository).delete(reaction);
    verify(reactionRepository, never()).save(any(UserPostReaction.class));
  }
}
