// src/components/forms/CustomSectionsForm.jsx
import React from "react";

const CustomSectionsForm = ({
  customSections = [],
  onAddSection,
  onChangeField,
  onAddField,
  onRemoveSection,
  onRemoveField,
}) => {
  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Custom Sections</h2>
        <button
          type="button"
          onClick={onAddSection}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Section
        </button>
      </div>

      {customSections.length === 0 && (
        <p className="text-gray-500 text-sm mb-2">No custom sections yet.</p>
      )}

      {customSections.map((section, sIndex) => (
        <div key={sIndex} className="border p-3 mb-2 rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <input
              type="text"
              placeholder="Section Heading"
              value={section.heading || ""}
              onChange={(e) =>
                onChangeField(sIndex, "heading", e.target.value)
              }
              className="border p-2 rounded w-full"
            />
            <button
              type="button"
              onClick={() => onRemoveSection(sIndex)}
              className="ml-2 text-red-600 text-sm hover:text-red-800"
            >
              ✕
            </button>
          </div>

          {section.fields?.map((field, fIndex) => (
            <div key={fIndex} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Label"
                value={field.label || ""}
                onChange={(e) =>
                  onChangeField(sIndex, "label", e.target.value, fIndex)
                }
                className="border p-2 rounded w-1/2"
              />
              <input
                type="text"
                placeholder="Value"
                value={field.value || ""}
                onChange={(e) =>
                  onChangeField(sIndex, "value", e.target.value, fIndex)
                }
                className="border p-2 rounded w-1/2"
              />
              <button
                type="button"
                onClick={() => onRemoveField(sIndex, fIndex)}
                className="text-red-600 text-sm hover:text-red-800"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => onAddField(sIndex)}
            className="text-blue-600 text-sm hover:text-blue-800"
          >
            + Add Field
          </button>
        </div>
      ))}
    </section>
  );
};

export default React.memo(CustomSectionsForm);
