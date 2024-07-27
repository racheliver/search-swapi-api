import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { manipulationString } from '../../utils/helper';

describe('manipulationString', () => {
  describe('applyQueryStyle', () => {
    it('applies query style correctly', () => {
      const result = manipulationString('applyQueryStyle', 'Hello World', 'World', 'test-id');
      render(<>{result}</>);
      const styledText = screen.getByText('World');
      expect(styledText.tagName).toBe('STRONG');
      expect(styledText).toHaveClass('queryStyle');
    });

    it('handles empty query', () => {
      const result = manipulationString('applyQueryStyle', 'Hello World', '', 'test-id');
      render(<>{result}</>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
  });

  describe('formatAttributeName', () => {
    it('formats attribute name correctly', () => {
      const result = manipulationString('formatAttributeName', 'first_name');
      expect(result).toBe('first name');
    });
  });

  describe('capitalizeChar', () => {
    it('capitalizes first character', () => {
      const result = manipulationString('capitalizeChar', 'hello');
      expect(result).toBe('Hello');
    });

    it('handles empty string', () => {
      const result = manipulationString('capitalizeChar', '');
      expect(result).toBe('');
    });
  });

  describe('generateUniqueId', () => {
    it('generates unique ids', () => {
      const id1 = manipulationString('generateUniqueId', 'test');
      const id2 = manipulationString('generateUniqueId', 'test');
      expect(id1).not.toBe(id2);
    });
  });

  it('throws error for invalid operation', () => {
    expect(() => (manipulationString as any)('invalidOperation', '')).toThrow('Invalid operation type');
  });
});